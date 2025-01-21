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
public class Courses {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;
    private double rating;
    private String tutor;
    private String language;
    private int enrolledStudents;
    private int price;

    @Column(columnDefinition = "TEXT")
    private String image;

    @ManyToMany
    @JoinTable(
            name = "courses_users",joinColumns = @JoinColumn(name = "courses_id"),
            inverseJoinColumns = @JoinColumn(name = "users_id")
    )
    @JsonIgnore
    private List<Users> usersEnrolled;




}
