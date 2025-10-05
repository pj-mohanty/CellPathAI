package com.cellpathai.controllers;

import com.cellpathai.FirestoreInitializer;
import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.concurrent.ExecutionException;

/**
 * Controller for fetching quiz data for the Dashboard UI.
 * Uses the Firestore collection: "dashboardQuizzes".
 */
//@CrossOrigin(origins = "http://localhost:3000")
@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/dashboard")
public class DashboardQuizController {

    private final Firestore db = FirestoreInitializer.getFirestore();

    /**
     * Returns all dashboard quizzes from Firestore.
     */
    @GetMapping("/quizzes")
    public List<Map<String, Object>> getDashboardQuizzes() throws ExecutionException, InterruptedException {
        List<Map<String, Object>> quizzes = new ArrayList<>();

        ApiFuture<QuerySnapshot> future = db.collection("dashboardQuizzes").get();
        List<QueryDocumentSnapshot> documents = future.get().getDocuments();

        for (QueryDocumentSnapshot doc : documents) {
            Map<String, Object> data = doc.getData();
            data.put("id", doc.getId());
            quizzes.add(data);
        }

        return quizzes;
    }
}
