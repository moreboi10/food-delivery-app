package in.sanketmore.delivery.app.api.io;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@Builder
@NoArgsConstructor
public class UserRequest {

    private String name;
    private String email;
    private String password;

}
