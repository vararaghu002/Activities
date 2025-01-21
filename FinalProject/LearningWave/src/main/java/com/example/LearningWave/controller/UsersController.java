package com.example.LearningWave.controller;

import com.example.LearningWave.model.Courses;
import com.example.LearningWave.model.Users;
import com.example.LearningWave.service.UsersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/users")
public class UsersController {

    @Autowired
    private UsersService usersService;

    @GetMapping("/all")
    public List<Users> allUsers(){
        return usersService.allUsers();
    }

    @PostMapping("/register")
    public void addUser(@RequestBody Users users){
        usersService.addUser(users);
    }

    @PostMapping("/login")
    public String login(@RequestBody Users users){
        return usersService.verify(users);
    }

    @GetMapping("/profile/{id}")
    public Users userById(@PathVariable Integer id){
        return usersService.userById(id);
    }

    @GetMapping("/profile/username/{username}")
    public Users userByUsername(@PathVariable String username){
        return usersService.userByUsername(username);
    }


    @PostMapping("/courses_enrolled/{userId}/{courseId}")
    public void addEnrolled(@PathVariable Integer userId,@PathVariable Integer courseId){
        usersService.addEnrolled(userId,courseId);
    }

    @GetMapping("/courses_enrolled/{userId}")
    public List<Courses> enrolled(@PathVariable Integer userId){
        return usersService.allEnrolled(userId);
    }

    @PutMapping("/update/{userId}")
    public void updateUser(@PathVariable Integer userId,@RequestBody Users updateDetails){
        usersService.updateProfile(userId,updateDetails);
    }

    @DeleteMapping("/delete/{userId}")
    public void deleteUser(@PathVariable Integer userId) {
        usersService.deleteProfile(userId);
    }

    @DeleteMapping("/cancelEnroll/{uid}/{cid}")
    public void cancelEnroll(@PathVariable Integer uid,@PathVariable Integer cid){
        usersService.cancelEnroll(uid,cid);
    }
}
