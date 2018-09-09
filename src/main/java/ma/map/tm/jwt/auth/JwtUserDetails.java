package ma.map.tm.jwt.auth;

import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@ToString
public class JwtUserDetails implements UserDetails {

	private @Getter @Setter String username;
    private @Getter String token;
    private @Getter Long id;
    private @Getter Collection<? extends GrantedAuthority> authorities;


    public JwtUserDetails(String username, long id, String token, List<GrantedAuthority> grantedAuthorities) {

        this.username = username;
        this.id = id;
        this.token= token;
        this.authorities = grantedAuthorities;
    }

    @Override
    public String getPassword() {
        return null;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    private static final long serialVersionUID = 5037748445184470550L;
}