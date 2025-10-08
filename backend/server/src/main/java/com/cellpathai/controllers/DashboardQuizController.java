package com.cellpathai.controllers;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ExecutionException;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cellpathai.FirestoreInitializer;
import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.QueryDocumentSnapshot;
import com.google.cloud.firestore.QuerySnapshot;


@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/dashboard")
public class DashboardQuizController {

    private final Firestore db = FirestoreInitializer.getFirestore();

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
