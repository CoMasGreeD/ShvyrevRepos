package maven.src;

import bsu.practice.logic.Post;
import bsu.practice.logic.PostCollection;
import com.google.gson.Gson;

import java.io.File;
import java.io.IOException;
import java.util.Collection;
import java.util.Scanner;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.Part;

@WebServlet(name="photopost", urlPatterns = "/photopost")
public class PhotoPostServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        String id = req.getParameter("id");
        String filename = req.getParameter("filename");
        PostCollection posts = new PostCollection();
        if (id != null) {
            Post post = posts.getPost(id);
            //Exception:
//            java.lang.NoClassDefFoundError: com/google/gson/Gson
//            bsu.practice.service.servlet.PhotoPostServlet.doGet(PhotoPostServlet.java:29)
//            javax.servlet.http.HttpServlet.service(HttpServlet.java:635)
//            javax.servlet.http.HttpServlet.service(HttpServlet.java:742)
//            org.apache.tomcat.websocket.server.WsFilter.doFilter(WsFilter.java:52)
            Gson gson = new Gson();
            if (post != null) {
                resp.getOutputStream().println(gson.toJson(post));
                resp.setStatus(200);
            }
            else {
                resp.sendError(500, "Post with specified ID was not found");
            }
        }
        else if (filename != null) {
            File post = new File("resources/data/posts/" + filename);
            //TODO: test if this works
            if (post.exists()) {
                resp.getOutputStream().print(post.toURI().toURL().toString());
            }
            else {
                resp.sendError(400, "No file was found with that filename");
            }
            //If it doesn't:
//            try (Scanner sc = new Scanner(post)) {
//                StringBuilder fileContent = new StringBuilder("");
//                while (sc.hasNext()) {
//                    fileContent.append(sc.next());
//                }
//                response.getOutputStream().print(fileContent.toString());
//                response.setStatus(200);
//            }
//            catch (IOException ioe) {
//                response.sendError(400, "No file was found with that filename or the file is corrupt");
//            }
        }
        else {
            resp.sendError(400, "Missing post ID and filename or they are invalid");
        }
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        Collection<Part> parts = req.getParts();
        for (Part part: parts) {
            String contentType = part.getContentType();
            if (contentType.equals("images/jpeg")) {
                String filename = dispatchFileName(part);
                resp.getOutputStream().println(filename);
                resp.setStatus(200);
            }
            else {
                resp.sendError(400, "File sent was not jpeg image");
            }
        }
    }

    private String dispatchFileName(Part part) {
        //TODO: write a better hash
        return part.getSubmittedFileName();
    }

    @Override
    protected void doDelete(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        String id = req.getParameter("id");
        PostCollection posts = new PostCollection();
        if (id != null) {
            if (posts.remove(id)) {
                resp.setStatus(200);
            }
            else {
                resp.sendError(500, "Post with specified ID was not found");
            }
        }
        else {
            resp.sendError(400, "Missing post ID or it is invalid");
        }
    }
}
