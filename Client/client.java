import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.Socket;

class Client {
	String host = "";
	int port = 0;
	Socket socket = null;
	InputStreamReader isr = null;
	BufferedReader bfr = null;
	final String errorMSG = "ERROR";
	
    public void main(String[] args) {
    	this.host = "localhost";
    	this.port = 1234;
        
        if(connect()) {
        	if(receive().equals("Bienvenido")) {
                send("/time");
                receive();
                send("/wait");
                receive();
                send("/time");
                receive();
                send("/quit");
                if(receive().equals("Bye"))
                    disconnect();
            }        	
        }
    }

    private void disconnect() {
        try {
            socket.close();
            System.out.println("CLIENT: Disconnected");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
    
    public boolean connect() {
        try {
			socket = new Socket(host, port);
			System.out.println("CLIENT: Connected");
			return true;
		} catch (IOException e) {
			e.printStackTrace();
			return false;
		}
    }
    
    public boolean send(String message) {
    	try {	        
	        PrintWriter pw = new PrintWriter(socket.getOutputStream());
            pw.println(message);
            pw.flush();  
    		System.out.println("CLIENT: Message sent: " + message);          
            return true;	        
		} catch (IOException e) {
			e.printStackTrace();
			return false;
		}
    }
    
    public String receive() {
		try {
			isr = new InputStreamReader(socket.getInputStream());
	        bfr = new BufferedReader(isr);
	        String ans = bfr.readLine();
			System.out.println("CLIENT: Message received: " + ans);
	        return ans;
		} catch (IOException e) {
			e.printStackTrace();
			return errorMSG;
		}
    }
}