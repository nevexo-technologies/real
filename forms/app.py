from typing import Tuple
import streamlit as st
from PIL import Image
import json, base64

LOGO_PATH = "resources/images/logo.png"
LOCALIZATION_DATA_PATH = "resources/localization.json"

def setup_app():
    if 'ref' not in st.session_state:
        st.session_state.ref = None
    if st.experimental_get_query_params():
        st.session_state.ref = st.experimental_get_query_params()['ref'][0]

    if 'form_stage' not in st.session_state:
        st.session_state.form_stage = 1

    if 'form_fields' not in st.session_state:
        st.session_state.form_fields = {}

def generate_header():
    logo = base64.b64encode(open(LOGO_PATH, "rb").read()).decode()

    col1, col2 = st.columns([0.25,1])
    col1.markdown(
        f"""
        <img src="data:image/png;base64,{logo}">
        """,
        unsafe_allow_html=True
    )
    col2.title("Registrul Educational Alternativ")
    st.markdown(
        """
        <style>
        h1 {
            margin:0;
            padding:0;
        }
        img {
            max-height:125px;
            margin: 0 auto;
        }
        </style>
        """,
        unsafe_allow_html=True
    )
    col2.caption("Formular dedicat elevilor liceelor din Bacau.")

def load_localization_data():
    with open(LOCALIZATION_DATA_PATH, "r") as file:
        return json.load(file)

def stage_handler():
    form_parent = st.empty()
    container = form_parent.container()
    fields = st.session_state.form_fields

    if st.session_state.form_stage == 1:
        container.subheader("Informații personale")
        fields['email'] = container.text_input("Care este adresa ta de email?")
        fields['e01'] = container.text_input("Ce vârstă ai?")
        fields['e02'] = container.selectbox("Gen", ["Selectează genul tău", "Masculin", "Feminin", "Altul", "Nu doresc să răspund"])
        with st.spinner("Se incarca informatiile liceelor. Te rugam sa astepti."):
            localization_data = load_localization_data()
            fields['e03'] = container.selectbox("În ce localitate înveți?*", ["Selecteaza o localitate",*localization_data.keys()])
            if fields['e03'] in localization_data.keys():
                fields['e04'] = container.selectbox("La ce liceu înveți?*", ["Selecteaza un liceu",*localization_data[fields['e03']]])

    if st.session_state.form_stage == 2:
        container.subheader("Oportunități")
        fields['e09'] = container.select_slider("Cât de des au fost promovate în liceu activități desfășurate în afara liceului?",['Deloc','Foarte rar','Rar','Des', 'Foarte des'], help="De exemplu: voluntariate, tabere, conferințe, ateliere etc.")
        fields['e10'] = container.select_slider("Cât de des au fost promovate în liceu activități desfășurate în cadrul liceului?",['Deloc','Foarte rar','Rar','Des', 'Foarte des'])
        fields['e11'] = container.select_slider("Cât de mult ai acces la ore suplimentare de pregătire?",['Deloc','Foarte putin','Putin','Mult', 'Foarte mult'])

    if st.session_state.form_stage == 3:
        container.subheader("Resurse")
        fields['e12'] = container.radio("În acest an școlar ai participat la ore în incinta școlii?", ["Da", "Nu"])

    next_btn = container.button("Urmatorul", key=f"nb{st.session_state.form_stage}")
    if next_btn:
        form_parent.empty()
        st.session_state.form_stage += 1
        st.session_state.form_fields = fields
        stage_handler()

def main():
    with st.spinner("Formularul se incarca. Te rugam sa astepti."):
        setup_app()
        generate_header()
    
    stage_handler()

if __name__ == "__main__":
    main()