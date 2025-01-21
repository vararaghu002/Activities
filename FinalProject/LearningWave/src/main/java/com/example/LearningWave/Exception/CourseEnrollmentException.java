package com.example.LearningWave.Exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.FORBIDDEN)
public class CourseEnrollmentException extends RuntimeException {

    public CourseEnrollmentException(String message) {
        super(message);
    }

}
