package com.example.LearningWave.service;

import com.example.LearningWave.model.Courses;
import com.example.LearningWave.model.Users;
import com.example.LearningWave.repository.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.LearningWave.repository.CoursesRepository;

import java.util.List;

@Service
public class CoursesService {

    @Autowired
    private CoursesRepository coursesRepository;

    @Autowired
    private UsersRepository usersRepository;


    public List<Courses> findAllCourses() {

        return coursesRepository.findAll();
    }

    public List<Courses> findCourses(String query) {
        return coursesRepository.searchCourse(query);
    }

    public Courses userdetails(int cid) {
        return coursesRepository.findById(cid).orElse(null);
    }


    public void addCourse(Courses course) {
        course.setEnrolledStudents(0);
        coursesRepository.save(course);
    }

    public void deleteCourse(Integer courseId) {
        Courses courses=coursesRepository.findById(courseId).orElseThrow(()->new RuntimeException("Error"));
        courses.getUsersEnrolled().forEach((users)->{
            users.getCoursesEnrolled().remove(courses);
        });
        coursesRepository.deleteById(courseId);
    }

    public int usersEnrolled(Integer courseId) {
        Courses courses=coursesRepository.findById(courseId)
                .orElseThrow(()->new RuntimeException("No course with the given ID : "+courseId));
        return courses.getUsersEnrolled().size();
    }

    public void updateCourse(Integer cid, Courses courseDetails) {
        Courses course=coursesRepository.findById(cid).orElseThrow(()->new RuntimeException("No course with id : "+cid));
        course.setTitle(courseDetails.getTitle());
        course.setDescription(courseDetails.getDescription());
        course.setTutor(courseDetails.getTutor());
        course.setEnrolledStudents(courseDetails.getEnrolledStudents());
        course.setLanguage(courseDetails.getLanguage());
        course.setPrice(courseDetails.getPrice());
        course.setImage(courseDetails.getImage());
        course.setRating(courseDetails.getRating());
        coursesRepository.save(course);
    }
}
