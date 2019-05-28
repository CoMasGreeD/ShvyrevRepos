package maven.src;

import bsu.practice.logic.Post;
import bsu.practice.logic.PostCollection;
import com.google.gson.Gson;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.*;

@WebServlet(name = "photoposts", urlPatterns = "/photoposts")
public class MultiplePostsServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        List<String> ids = new ArrayList<>();
        Map<String, String> result = new HashMap<>();
        String id;
        String jsonPost;
        Gson gson = new Gson();
        Integer postNum = Integer.parseInt(request.getParameter("count"));
        for (int i = 0; i < postNum; i++) {
            id = request.getParameter("id" + i);
            ids.add(id);
            jsonPost = getOnePost(id);
            if (jsonPost != null) {
                result.put(id, jsonPost);
            }
        }
        response.getOutputStream().println(gson.toJson(result));
        response.setStatus(200);
    }

    private String getOnePost(String id) {
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
                return gson.toJson(post);
            }
        }
        return null;
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) {

    }

    @Override
    protected void doDelete(HttpServletRequest request, HttpServletResponse response) {
        List<String> ids = new ArrayList<>();
        String id;
        PostCollection posts = new PostCollection();
        Integer postNum = Integer.parseInt(request.getParameter("count"));
        for (int i = 0; i < postNum; i++) {
            id = request.getParameter("id" + i);
            if (posts.remove(id)) { ids.add(id); }
        }
    }

}
