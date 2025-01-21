package com.example.LearningWave.service;

import com.example.LearningWave.Exception.AlreadyEnrolledException;
import com.example.LearningWave.Exception.CourseEnrollmentException;
import com.example.LearningWave.model.Courses;
import com.example.LearningWave.model.Role;
import com.example.LearningWave.model.Users;
import com.example.LearningWave.repository.CoursesRepository;
import com.example.LearningWave.repository.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class UsersService {
    @Autowired
    private UsersRepository usersRepository;

    @Autowired
    private CoursesRepository coursesRepository;

    @Autowired
    private JWTService jwtService;

    @Autowired
    private AuthenticationManager authManager;

    private BCryptPasswordEncoder encoder=new BCryptPasswordEncoder(12);

    public List<Users> allUsers() {
        return usersRepository.findAll();
    }

    public void addUser(Users users) {
        users.setPassword(encoder.encode(users.getPassword()));
        users.setConfirmPassword(encoder.encode(users.getConfirmPassword()));
        if(users.getRole()==null){
            users.setRole(Role.USER);
        }
        else{
            users.setRole(users.getRole());
        }
        usersRepository.save(users);
    }

    public String verify(Users users) {
        Authentication authentication=authManager.authenticate(new UsernamePasswordAuthenticationToken(users.getUsername(),users.getPassword()));
        if(authentication.isAuthenticated()) {
            return jwtService.generateToken(users.getUsername());
        }
        return "Fail";
    }

    public List<Courses> allEnrolled(Integer userId) {
        Users users=usersRepository.findById(userId)
                .orElseThrow(()->new RuntimeException("No user with id"));
        return users.getCoursesEnrolled();
    }

    public void addEnrolled(Integer userId,Integer courseId) {
        Courses courses=coursesRepository.findById(courseId)
                .orElseThrow(()->new RuntimeException("No course with id"));
        Users users=usersRepository.findById(userId)
                .orElseThrow(()->new RuntimeException("No user with id"));
        if(users.getCoursesEnrolled().contains(courses)){
            throw new AlreadyEnrolledException("Already Enrolled in the Course");
        }
        if(users.getCoursesEnrolled().size()>=5){
            throw new CourseEnrollmentException("Course Enrollment limit exceeded");
        }
        courses.setEnrolledStudents(courses.getEnrolledStudents()+1);
        users.getCoursesEnrolled().add(courses);
        courses.getUsersEnrolled().add(users);
        coursesRepository.save(courses);
        usersRepository.save(users);
    }


    public void updateProfile(Integer userId,Users updateDetails) {
        Users users=usersRepository.findById(userId)
                .orElseThrow(()->new RuntimeException("No user with id"));
        users.setUsername(updateDetails.getUsername());
        users.setPassword(encoder.encode(updateDetails.getPassword()));
        users.setEmail(updateDetails.getEmail());
        users.setConfirmPassword(encoder.encode(updateDetails.getConfirmPassword()));
        users.setFname(updateDetails.getFname());
        users.setLname(updateDetails.getLname());
        if(users.getRole()==null){
            users.setRole(Role.USER);
        }
        else{
            users.setRole(users.getRole());
        }
        users.setPhone(updateDetails.getPhone());
        usersRepository.save(users);
    }


    public void deleteProfile(Integer userId) {
        Users users=usersRepository.findById(userId).orElseThrow(()->new RuntimeException("Error"));
        users.getCoursesEnrolled().forEach((cor)->{
            cor.getUsersEnrolled().remove(users);
        });
        usersRepository.deleteById(userId);
    }

    public Users userById(Integer id) {
        return usersRepository.findById(id).orElseThrow(()->new RuntimeException("No profile with the given ID : "+id));
    }

    public Users userByUsername(String username) {
        return usersRepository.findByUsername(username);
    }

    public void cancelEnroll(Integer uid,Integer cid) {
        Courses course=coursesRepository.findById(cid).orElseThrow(()->new RuntimeException("No course with the given Id:"+cid));
        Users user=usersRepository.findById(uid).orElseThrow(()->new RuntimeException("No user with the given Id:"+uid));
        user.getCoursesEnrolled().remove(course);
        course.getUsersEnrolled().remove(user);
        usersRepository.save(user);
    }
}
