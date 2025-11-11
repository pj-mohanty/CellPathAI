package com.cellpathai.utils;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.cellpathai.FirestoreInitializer;
import com.google.cloud.Timestamp;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.WriteBatch;

public class FirestoreSeeder {

    private final Firestore db;

    public FirestoreSeeder() {
        this.db = FirestoreInitializer.getFirestore();
    }

    public void seedDashboardQuizzes() {
        try {
            WriteBatch batch = db.batch();
            List<Map<String, Object>> quizData = createSampleQuizData();

            for (Map<String, Object> quiz : quizData) {
                DocumentReference docRef = db.collection("dashboardQuizzes").document();
                batch.set(docRef, quiz);
                System.out.println("Added quiz: " + quiz.get("topic") + " (" + quiz.get("category") + ")");
            }

            batch.commit().get();
            System.out.println("✅ Successfully seeded " + quizData.size() + " quiz records!");
        } catch (Exception e) {
            System.err.println("❌ Error seeding data: " + e.getMessage());
            e.printStackTrace();
        }
    }

    private List<Map<String, Object>> createSampleQuizData() {
        List<Map<String, Object>> quizzes = new ArrayList<>();

        // category options: Function, Pathway, Mechanism, Regulation, Application
        Object[][] data = {
                {"Protein Metabolism",   "Function",    85, 1, "09/10/2025", "Passed"},
                {"Glycolysis",           "Pathway",     92, 1, "09/11/2025", "Passed"},
                {"Cell Cycle",           "Mechanism",   47, 2, "09/12/2025", "Failed"},      // FAIL
                {"DNA Replication",      "Mechanism",   63, 1, "09/13/2025", "Passed"},
                {"Photosynthesis",       "Pathway",     78, 1, "09/14/2025", "Passed"},
                {"Enzyme Kinetics",      "Regulation",  59, 2, "09/15/2025", "Passed"},
                {"Mitosis & Meiosis",    "Mechanism",   44, 2, "09/16/2025", "Failed"},      // FAIL
                {"Cell Membrane",        "Structure",   66, 1, "09/17/2025", "Passed"},     // Change to allowed category below
                {"Respiration",          "Pathway",     53, 1, "09/18/2025", "Passed"},
                {"Genetics",             "Application", 82, 1, "09/19/2025", "Passed"},
                {"Chromosomal Disorders","Application", 72, 1, "09/20/2025", "Passed"},
                {"Cell Signaling",       "Regulation",  91, 1, "09/21/2025", "Passed"},
                {"Amino Acid Synthesis", "Pathway",     39, 3, "09/22/2025", "Failed"},     // FAIL
                {"Membrane Transport",   "Function",    76, 1, "09/23/2025", "Passed"},
                {"Cell Differentiation", "Application", 84, 1, "09/24/2025", "Passed"},
        };

        // Fix: Replace invalid category "Structure" → choose "Function"
        for (Object[] row : data) {
            if (row[1].equals("Structure")) row[1] = "Function";
        }

        for (Object[] row : data) {
            Map<String, Object> quiz = new HashMap<>();
            quiz.put("topic", row[0]);
            quiz.put("category", row[1]);
            quiz.put("score", row[2]);
            quiz.put("attempts", row[3]);
            quiz.put("date", row[4]);
            quiz.put("status", row[5]);
            quiz.put("createdAt", Timestamp.now());
            quiz.put("updatedAt", Timestamp.now());
            quizzes.add(quiz);
        }

        return quizzes;
    }

    public static void main(String[] args) {
        System.out.println("🚀 Starting Firestore seeding...");
        FirestoreSeeder seeder = new FirestoreSeeder();
        seeder.seedDashboardQuizzes();
        System.out.println("✅ Seeding completed!");
    }
}
