package bsu.practice;

import java.io.IOException;
import java.util.Enumeration;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet(name="check", urlPatterns = "/check")
public class CheckServlet extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        Enumeration<String> names = req.getParameterNames();
        String nextName;
        StringBuilder json = new StringBuilder("{");
        while (names.hasMoreElements()) {
            nextName = names.nextElement();
            if (nextName != null) {
                json.append("\"");
                json.append(nextName);
                json.append("\"");
                json.append(": ");
                json.append(req.getParameter(nextName));
                json.append(",\n");
            }
        }
        json.append("}");
        resp.getOutputStream().print(json.toString());
    }
}