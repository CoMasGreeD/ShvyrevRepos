package bsu.practice;

import java.io.IOException;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet(name="name", urlPatterns = "/get")
public class NameServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        StringBuilder responseHTML = new StringBuilder("<html><body>");
        String query = req.getQueryString();
        String[] queryParams = query.split("&");
        String paramName;
        String paramValue;
        String[] tuple;
        for (String param: queryParams) {
            tuple = param.split("=");
            paramName = tuple[0];
            paramValue = tuple[1];
            if (paramValue.length() <= 100) {
                responseHTML.append("<p>");
                responseHTML.append(paramName);
                responseHTML.append(" = ");
                responseHTML.append(paramValue);
                responseHTML.append("</p>");
            }
        }
        responseHTML.append("</body></html>");
        resp.getOutputStream().print(responseHTML.toString());
    }
}