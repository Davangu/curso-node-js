import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.PrintWriter;
import java.net.InetSocketAddress;
import java.net.ServerSocket;
import java.net.Socket;

public class App {
	private static final int port = 1234;
    private ServerSocket server = null;
	
	public static void main(String[] args) {
        Thread t;
        System.out.println("INFO: Server launching...");
        server = new ServerSocket(port);
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
        is = client.getInputStream();
        isr = new InputStreamReader(is);
        bf = new BufferedReader(isr);
        os = client.getOutputStream();
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
				cont = sendAnswer(message);	
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
	}

	private Boolean sendAnswer(String message, pw) {
        getAnswer(message);
        if(message == "quit"){
            return false;
        } else {
            pw.write(message);
            pw.flush();
        }
		return true;
	}

    private String getAnswer(String message){
        switch(message){
            case "/quit":
                return "quit";
            case "/wait":
                try {
                    int waitTime = Random.nextInt(3001);
                    Thread.sleep();
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
                return waitTime.toString();
            default:
                return "true";
        }
		return true;
    }
}
