package com.cellpathai;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.firestore.Firestore;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.cloud.FirestoreClient;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;

public class FirestoreInitializer {
    private static Firestore firestore;

    public static Firestore getFirestore() {
        if (firestore == null) {
            initialize();
        }
        return firestore;
    }

    private static void initialize() {
        try {
            // ✅ Path to your Firebase key (relative to project root)
            String keyPath = "server/src/main/resources/firebase-key.json";

            File file = new File(System.getProperty("user.dir"), keyPath);

            if (!file.exists()) {
                throw new RuntimeException("❌ Firebase key file not found at: " + file.getAbsolutePath());
            }

            FileInputStream serviceAccount = new FileInputStream(file);

            FirebaseOptions options = FirebaseOptions.builder()
                    .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                    .build();

            if (FirebaseApp.getApps().isEmpty()) {
                FirebaseApp.initializeApp(options);
                System.out.println("✅ Firebase initialized successfully!");
            }

            firestore = FirestoreClient.getFirestore();

        } catch (IOException e) {
            throw new RuntimeException("❌ Error initializing Firestore: " + e.getMessage(), e);
        }
    }
}
