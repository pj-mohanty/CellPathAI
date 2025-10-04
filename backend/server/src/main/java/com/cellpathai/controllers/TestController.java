package com.cellpathai.controllers;

import com.cellpathai.FirestoreInitializer;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.QueryDocumentSnapshot;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api")
public class TestController {

    @GetMapping("/test")
    public Map<String, Object> getTestData() {
        try {
            Firestore db = FirestoreInitializer.getFirestore();
            DocumentSnapshot doc = db.collection("users").document("user1").get().get();
            return doc.exists() ? doc.getData() : Map.of("error", "Document not found");
        } catch (Exception e) {
            e.printStackTrace();
            return Map.of("error", e.getMessage());
        }
    }

    @GetMapping("/dashboardQuizzes")
    public List<Map<String, Object>> getDashboardQuizzes() {
        List<Map<String, Object>> results = new ArrayList<>();
        try {
            Firestore db = FirestoreInitializer.getFirestore();
            List<QueryDocumentSnapshot> docs =
                    db.collection("dashboardQuizzes").get().get().getDocuments();

            for (QueryDocumentSnapshot doc : docs) {
                results.add(doc.getData());
            }
        } catch (Exception e) {
            e.printStackTrace();
            results.add(Map.of("error", e.getMessage()));
        }
        return results;
    }
}
