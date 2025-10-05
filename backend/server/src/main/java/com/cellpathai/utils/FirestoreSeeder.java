package com.cellpathai.utils;

import com.cellpathai.FirestoreInitializer;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.WriteBatch;

import java.util.*;

public class FirestoreSeeder {

    private final Firestore db;

    public FirestoreSeeder() {
        this.db = FirestoreInitializer.getFirestore(); // use your initialized Firestore
    }

    public void seedDashboardQuizzes() {
        try {
            WriteBatch batch = db.batch();
            List<Map<String, Object>> quizData = createSampleQuizData();

            for (Map<String, Object> quiz : quizData) {
                DocumentReference docRef = db.collection("dashboardQuizzes").document();
                batch.set(docRef, quiz);
                System.out.println("Added quiz: " + quiz.get("topic") + " - " + quiz.get("quiz"));
            }

            batch.commit().get();
            System.out.println(" Successfully seeded " + quizData.size() + " quiz records!");
        } catch (Exception e) {
            System.err.println(" Error seeding data: " + e.getMessage());
            e.printStackTrace();
        }
    }

    private List<Map<String, Object>> createSampleQuizData() {
        List<Map<String, Object>> quizzes = new ArrayList<>();
        String[] topics = {
                "Protein Metabolism", "Glycolysis", "Cell Cycle", "DNA Replication",
                "Photosynthesis", "Enzyme Kinetics", "Mitosis & Meiosis",
                "Cell Membrane", "Respiration", "Genetics"
        };
        String[] statuses = {"Passed", "Attempted", "Failed"};
        Random rand = new Random();

        for (int i = 0; i < topics.length; i++) {
            Map<String, Object> quiz = new HashMap<>();
            quiz.put("topic", topics[i]);
            quiz.put("quiz", "Quiz " + (rand.nextInt(3) + 1));
            quiz.put("score", 50 + rand.nextInt(50));
            quiz.put("attempts", 1 + rand.nextInt(3));
            quiz.put("date", "09/" + (10 + i) + "/2025");
            quiz.put("status", statuses[rand.nextInt(statuses.length)]);
            quiz.put("createdAt", com.google.cloud.Timestamp.now());
            quiz.put("updatedAt", com.google.cloud.Timestamp.now());
            quizzes.add(quiz);
        }
        return quizzes;
    }

    public static void main(String[] args) {
        System.out.println("Starting Firestore seeding...");
        FirestoreSeeder seeder = new FirestoreSeeder();
        seeder.seedDashboardQuizzes();
        System.out.println("Seeding process completed!");
    }
}
