import cv2
import numpy as np
import tensorflow as tf
import streamlit as st
from PIL import Image

from tensorflow.keras.models import load_model

new_model = load_model('models/boxclassifier.h5')

st.sidebar.title("Damaged Box Predictor")

uploaded_file = st.sidebar.file_uploader("Choose an image")
if uploaded_file is not None:

     if st.sidebar.button("Check"):
         col1,col2 = st.columns(2)
         img = cv2.imread(uploaded_file.name)
         resize = tf.image.resize(img, (256, 256))
         img = Image.open(uploaded_file.name)
         pred = new_model.predict(np.expand_dims(resize / 255, 0))

         st.image(img)

         if(pred>0.5):
             st.write("The box is not damaged")
         else:
            st.write("The box is damaged")



