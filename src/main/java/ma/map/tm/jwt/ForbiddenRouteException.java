package ma.map.tm.jwt;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.FORBIDDEN)
public class ForbiddenRouteException extends RuntimeException {
	public ForbiddenRouteException() {
		super("Acces denied. Admin only");
	}
	
	private static final long serialVersionUID = 6652634118800807670L;
}
