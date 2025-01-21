package com.example.LearningWave.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Users {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    private String username;
    private String email;
    private String password;
    private String confirmPassword;
    private String fname;
    private String lname;
    private String phone;
    private String aboutme;

    @Enumerated(EnumType.STRING)
    private Role role;


    @ManyToMany(mappedBy = "usersEnrolled", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Courses> coursesEnrolled;



}
