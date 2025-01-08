import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.PrintWriter;
import java.net.InetSocketAddress;
import java.net.ServerSocket;
import java.net.Socket;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Random;

public class App {
	private static final int port = 1234;
    private static ServerSocket server = null;
	
	public static void main(String[] args) {
        Thread t;
        Socket client = null;
        System.out.println("INFO: Server launching...");
        try {
            server = new ServerSocket(port);
        } catch (IOException e) {
            e.printStackTrace();
            System.out.println("ERROR: Failed opening server socket");
            return;
        }
        System.out.println("INFO: Listening on port " + port);

        while (true){
        	try {
                System.out.println("INFO: Waiting for client...");
                client = server.accept();
                System.out.println("OK: Client connected!");
                
                t = new Thread(new Task(client));
                t.start();
            } catch (Exception ex) {
                System.out.println("ERROR: Failed connecting to client");
                ex.printStackTrace();
            }
        }
    }
}

class Task implements Runnable{
    private Socket client = null;
    private String motd = "Hello, client!";

    public Task(Socket client){
        this.client = client;
    }
    	
	@Override
	public void run(){

        Boolean cont = true;
        InputStream is = null;
        InputStreamReader isr = null;
        BufferedReader bf = null;
        PrintWriter pw = null;
        OutputStream os = null;

        System.out.println("OK: Conection stablished!");
				
        // Create handlers
        try {
            is = client.getInputStream();
            os = client.getOutputStream();
            isr = new InputStreamReader(is);
            bf = new BufferedReader(isr);
            pw = new PrintWriter(os);

            // Write motd
            pw.write(motd);
            pw.flush();
            System.out.println("SERVER: Message sent");
            
            while (cont){
                try {
                    // Read message
                    System.out.println("SERVER: Waiting...");
                    String message = bf.readLine();
                    System.out.println("SERVER: Message received");
                    
                    // Send answer
                    cont = sendAnswer(message, pw);	
                } catch (IOException e) {
                    System.out.println("ERROR: Failed connecting to client");
                    e.printStackTrace();
                }
            }

            // Close handlers
            pw.close();
            os.close();
            bf.close();
            isr.close();
            is.close();
            client.close();
        } catch (IOException e) {
            e.printStackTrace();
            System.out.println("ERROR: Can't get input/output streams");
            return;
        }
	}

	private Boolean sendAnswer(String message, PrintWriter pw) {
        String answer = getAnswer(message);
        Boolean cont = true;
        if(answer.equals("Bye")){
            cont = false;
        }
        pw.write(answer);
        pw.flush();
		return cont;
	}

    private String getAnswer(String message){
        switch(message){
            case "/quit":
                return "Bye";
            case "/wait":
                int waitTime = new Random().nextInt(3001);
                try {                    
                    Thread.sleep(waitTime);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
                return String.valueOf(waitTime);
            case "/time":
                DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss");
                return LocalDateTime.now().format(dtf);
            default:
                return "not_recognized";
        }
    }
}
