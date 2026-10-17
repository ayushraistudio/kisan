import os
import json
import tensorflow as tf
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras.applications import MobileNetV2
from tensorflow.keras.layers import Dense, GlobalAveragePooling2D, Dropout
from tensorflow.keras.models import Model
from tensorflow.keras.optimizers import Adam
from tensorflow.keras.callbacks import ModelCheckpoint, EarlyStopping

# Define configuration parameters
DATASET_DIR = "dataset"
MODEL_SAVE_PATH = "custom_disease_model.h5"
LABELS_SAVE_PATH = "class_labels.json"
IMG_SIZE = (224, 224)
BATCH_SIZE = 32
EPOCHS = 10

def build_and_train_model():
    print("Initializing Data Generators...")
    
    # Configure image augmentation to prevent overfitting
    data_generator = ImageDataGenerator(
        rescale=1./255,
        rotation_range=20,
        width_shift_range=0.2,
        height_shift_range=0.2,
        horizontal_flip=True,
        validation_split=0.2 # Use 20% of data for validation
    )

    print("Loading Training Data...")
    train_dataset = data_generator.flow_from_directory(
        DATASET_DIR,
        target_size=IMG_SIZE,
        batch_size=BATCH_SIZE,
        class_mode='categorical',
        subset='training'
    )

    print("Loading Validation Data...")
    val_dataset = data_generator.flow_from_directory(
        DATASET_DIR,
        target_size=IMG_SIZE,
        batch_size=BATCH_SIZE,
        class_mode='categorical',
        subset='validation'
    )

    # Save class indices for inference mapping
    class_indices = {v: k for k, v in train_dataset.class_indices.items()}
    with open(LABELS_SAVE_PATH, 'w') as f:
        json.dump(class_indices, f)
    print(f"Class labels mapped and saved to {LABELS_SAVE_PATH}")

    # Load pre-trained MobileNetV2 without the top classification layer
    print("Building Model Architecture...")
    base_model = MobileNetV2(weights='imagenet', include_top=False, input_shape=(224, 224, 3))
    base_model.trainable = False # Freeze base layers initially

    # Add custom classification head
    x = base_model.output
    x = GlobalAveragePooling2D()(x)
    x = Dense(128, activation='relu')(x)
    x = Dropout(0.5)(x)
    predictions = Dense(train_dataset.num_classes, activation='softmax')(x)

    model = Model(inputs=base_model.input, outputs=predictions)

    # Compile the model
    model.compile(
        optimizer=Adam(learning_rate=0.001),
        loss='categorical_crossentropy',
        metrics=['accuracy']
    )

    # Define callbacks for optimal training
    checkpoint = ModelCheckpoint(MODEL_SAVE_PATH, monitor='val_accuracy', save_best_only=True, mode='max', verbose=1)
    early_stop = EarlyStopping(monitor='val_loss', patience=3, restore_best_weights=True)

    print("Starting Model Training...")
    history = model.fit(
        train_dataset,
        validation_data=val_dataset,
        epochs=EPOCHS,
        callbacks=[checkpoint, early_stop]
    )

    print(f"Training Complete! Best model saved to {MODEL_SAVE_PATH}")

if __name__ == "__main__":
    if not os.path.exists(DATASET_DIR):
        print(f"Error: Directory '{DATASET_DIR}' not found. Please create it and add image folders.")
    else:
        build_and_train_model()