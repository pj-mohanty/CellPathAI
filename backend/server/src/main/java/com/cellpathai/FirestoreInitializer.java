package com.cellpathai;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.cloud.firestore.Firestore;
import com.google.firebase.cloud.FirestoreClient;

import java.io.InputStream;

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
            // ✅ Load firebase-key.json from src/main/resources
            InputStream serviceAccount = FirestoreInitializer.class
                    .getClassLoader()
                    .getResourceAsStream("firebase-key.json");

            if (serviceAccount == null) {
                throw new RuntimeException("❌ firebase-key.json not found in resources");
            }

            FirebaseOptions options = FirebaseOptions.builder()
                    .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                    .build();

            if (FirebaseApp.getApps().isEmpty()) {
                FirebaseApp.initializeApp(options);
            }

            firestore = FirestoreClient.getFirestore();

        } catch (Exception e) {
            throw new RuntimeException("❌ Error initializing Firestore: " + e.getMessage(), e);
        }
    }
}
