package com.task.cmvInternTask.component;

import com.task.cmvInternTask.entity.ERole;
import com.task.cmvInternTask.entity.Role;
import com.task.cmvInternTask.entity.User;
import com.task.cmvInternTask.repository.IRoleRepository;
import com.task.cmvInternTask.repository.IUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.HashSet;
import java.util.Set;

@Component
public class AdminUserInitializer implements CommandLineRunner {


    @Autowired
    IRoleRepository roleRepository;
    @Autowired
    IUserRepository userRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {




        User user = new User();
        user.setUsername("admin");

        user.setPassword(passwordEncoder.encode("admin123"));

        if(!userRepository.findByUsername("admin").isEmpty()) return;
        Role role = new Role();
        role.setRole(ERole.ADMIN);
        roleRepository.save(role);


        Set<Role> roles = new HashSet<>();
        roles.add(role);
        user.setRoles(roles);

        userRepository.save(
                user);

    }
}
