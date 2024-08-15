package com.example.server1.auth;

import org.springframework.web.bind.annotation.RestController;

import com.example.server1.user.User;
import com.example.server1.user.repository.UserRepo;

import lombok.RequiredArgsConstructor;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;



@RestController
@RequestMapping("/security")
@CrossOrigin
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;
    @Autowired
    UserRepo repo;

    @GetMapping("/all")
    public List<User> getMethod() {
        return repo.findAll();
    }
    @DeleteMapping("/delete/{email}")
    public Boolean delete(@PathVariable String email)
    {
        repo.deleteById(email);
        return true;
    }
    @GetMapping("/getid/{email}")
    public Optional<User> getMethodName(@PathVariable String email) {
        return repo.findById(email);
    }
    
    
    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> postMethodName(@RequestBody RegisterRequest registerRequest) {
        // Optional<User> det=repo.findByEmail(registerRequest);
        List<User>det=repo.findemail1(registerRequest.getEmail());
        if(det.size()==0){
            AuthenticationResponse authResponse=authService.register(registerRequest);
            return ResponseEntity.ok(authResponse);
        }

        return ResponseEntity.status(409).body(null);
    }
    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> authenticate(
            @RequestBody AuthenticationRequest request
    ) {
       return ResponseEntity.ok(authService.authenticate(request));
    }
}