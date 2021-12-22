import streamlit as st
import json

st.session_state.ref = None
if st.experimental_get_query_params():
    st.session_state.ref = st.experimental_get_query_params()['ref'][0]

st.title("Formular REAL")

localization_data = {}
with st.spinner("Se încarcă datele.. te rugăm să aștepți."):
    with open("processed.json", "r") as file:
        localization_data = json.load(file)

st.subheader("Informații personale")
email = st.text_input("Care este adresa ta de email?")
age = st.text_input("Ce vârstă ai?")
gender = st.selectbox("Gen", ["Selectează genul tău", "Masculin", "Feminin", "Altul", "Nu doresc să răspund"])
county = st.selectbox("În ce localitate înveți?*", ["Selecteaza o localitate",*localization_data.keys()])
if county in localization_data.keys():
    institution = st.selectbox("La ce liceu înveți?*", ["Selecteaza un liceu",*localization_data[county]])

st.subheader("Oportunități")
e09 = st.select_slider("Cât de des au fost promovate în liceu activități desfășurate în afara liceului?", ["Deloc", "Foarte Rar", "Rar", "Des", "Foarte des"])

