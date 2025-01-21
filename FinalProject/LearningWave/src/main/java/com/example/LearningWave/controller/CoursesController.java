package com.example.LearningWave.controller;

import com.example.LearningWave.model.Users;
import com.example.LearningWave.service.CoursesService;
import com.example.LearningWave.model.Courses;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/courses")
public class CoursesController {

    @Autowired
    private CoursesService coursesService;

   @GetMapping("/coursedetails/{cid}")
   private Courses userdetails(@PathVariable int cid) {
       return coursesService.userdetails(cid);
   }


    @GetMapping("/all")
    public List<Courses> allCourses(){
        return coursesService.findAllCourses();
    }

    @GetMapping("/search")
    public List<Courses> search(@RequestParam String keyword){
        return coursesService.findCourses(keyword);
    }

    @PostMapping("/add")
    public void addCourse(@RequestBody Courses course){

       coursesService.addCourse(course);
    }

    @DeleteMapping("/delete/{courseId}")
    public void deleteCourse(@PathVariable Integer courseId){
        coursesService.deleteCourse(courseId);
    }

    @GetMapping("/usersEnrolled/{courseId}")
    public int usersEnrolled(@PathVariable Integer courseId){
        return coursesService.usersEnrolled(courseId);
    }

    @PutMapping("/update/{cid}")
    public void updateCourse(@PathVariable Integer cid,@RequestBody Courses courseDetails){
       coursesService.updateCourse(cid,courseDetails);
    }
}
