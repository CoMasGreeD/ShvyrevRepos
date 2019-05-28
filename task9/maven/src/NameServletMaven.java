package maven.src;

import java.io.IOException;
import java.util.Map;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet(name="name", urlPatterns = "/get")
public class NameServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        StringBuilder responseHTML = new StringBuilder("<html><body>");
        Map<String, String[]> query = req.getParameterMap();
        for (Map.Entry<String, String[]> e : query.entrySet()) {
            responseHTML.append("<p>");
            responseHTML.append(e.getKey());
            responseHTML.append(" = ");
            for (String s : e.getValue()) {
                responseHTML.append(s);
                responseHTML.append(" ");
            }
            responseHTML.append("</p>");
        }
        responseHTML.append("</body></html>");
        resp.getOutputStream().print(responseHTML.toString());
    }
}