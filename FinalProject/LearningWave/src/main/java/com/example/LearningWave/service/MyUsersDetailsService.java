package com.example.LearningWave.service;

import com.example.LearningWave.model.UserPrincipal;
import com.example.LearningWave.model.Users;
import com.example.LearningWave.repository.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class MyUsersDetailsService implements UserDetailsService {

    @Autowired
    private UsersRepository usersRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Users user=usersRepository.findByUsername(username);
        if(user==null)
            throw new UsernameNotFoundException(username+" not found");
        return new UserPrincipal(user);
    }
}
