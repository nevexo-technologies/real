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
        fields['E01'] = container.text_input("Ce vârstă ai?")
        fields['E02'] = container.selectbox("Gen", ["Selectează genul tău", "Masculin", "Feminin", "Altul", "Nu doresc să răspund"])
        with st.spinner("Se incarca informatiile liceelor. Te rugam sa astepti."):
            localization_data = load_localization_data()
            fields['E03'] = container.selectbox("În ce localitate înveți?*", ["Selecteaza o localitate",*localization_data.keys()])
            if fields['E03'] in localization_data.keys():
                fields['E04'] = container.selectbox("La ce liceu înveți?*", ["Selecteaza un liceu",*localization_data[fields['E03']]])

    if st.session_state.form_stage == 2:
        container.subheader("Oportunități")
        fields['E09'] = container.select_slider("Cât de des au fost promovate în liceu activități desfășurate în afara liceului?",['Deloc','Foarte rar','Rar','Des', 'Foarte des'], help="De exemplu: voluntariate, tabere, conferințe, ateliere etc.")
        fields['E10'] = container.select_slider("Cât de des au fost promovate în liceu activități desfășurate în cadrul liceului?",['Deloc','Foarte rar','Rar','Des', 'Foarte des'], help="De exemplu: club de lectură, club de fotografie, cor etc.")
        fields['E11'] = container.select_slider("Cât de mult ai acces la ore suplimentare de pregătire?",['Deloc','Foarte putin','Putin','Mult', 'Foarte mult'], help="De exemplu: sesiuni de pregătire în afara orelor pentru concursuri, olimpiade, examene, imbunătățirea situației școlare etc.")

    if st.session_state.form_stage == 3:
        container.subheader("Resurse")
        fields['E12'] = container.radio("În acest an școlar ai participat la ore în incinta școlii?", ["Da", "Nu"], help="Dacă ai participat și la ore online și fizice, selectează da la această întrebare")
        fields['E12B'] = container.select_slider("Cât de bun este nivelul dotărilor ce ți-au fost puse la dispoziție în liceu?", ["Foarte slab", "Slab", "Moderat", "Bun", "Foarte bun"], help="De exemplu: scaune și bănci, laboratoare, materiale didactice, calculatoare etc.")
        fields['E12C'] = container.select_slider("Cât de îngrijit ți se pare liceul tău?", ["Foarte Puțin", "Puțin", "Moderat", "Mult", "Foarte Mult"], help="De exemplu: igiena băilor, a sălilor de clasă, prezența dezinfectantului, săpunului, hârtiei igienice, starea clădirilor etc.")
    
    if st.session_state.form_stage == 4:
        container.subheader("Personal")
        fields['E15'] = container.select_slider("Cât de bună este relația ta cu profesorii?",["Foarte slabă", "Slabă", "Moderată", "Bună", "Foarte Bună"], help="Întrebarea se referă la: respectul reciproc, susținerea acordată etc.",)
        fields['E24'] = container.multiselect("Care sunt principalele tale surse de stres? (Poți alege mai multe variante.)", ["Colectivul de elevi", "Colectivul de profesori", "Prestigiul liceului", "Programul", "Transportul către liceu", "Temele pentru acasă", "Evaluările", "Personalul auxiliar (secretariat, pază, etc.)", "Lipsa de timp pentru pregătire", "Altele", "Niciuna", "Nu știu/Nu vreau să răspund."])

    if st.session_state.form_stage == 5:
        container.subheader("Elevi")
        fields['E27'] = container.select_slider("Cât de divers ți se pare colectivul liceului tău?", ["Foarte puțin divers", "Puțin divers", "Moderat", "Divers", "Foarte divers"],help="De exemplu: diversitate etnică, religioasă, de gen, de mentalitate, etc. ")
        fields['E28'] = container.select_slider("Cât de ușor ți-a fost să te integrezi în colectiv?",["Foarte greu", "Greu", "Moderat", "Ușor", "Foarte Ușor"])
        fields['E29'] = container.select_slider("Cât de competitivi consideri că sunt colegii tăi?", ["Foarte puțin competitivi", "Puțin competitivi", "Moderat", "Competitivi", "Foarte Competitivi"])

    if st.session_state.form_stage == 6:
        container.subheader("Recomandări")
        fields['E31'] = container.text_area("Ce sfaturi i-ai da unui viitor elev în liceul tău?", max_chars=250)
        fields['E32'] = container.text_area("Ce sfaturi le-ai da profesorilor tăi?", max_chars=250)
        fields['E33'] = container.text_area("Ce recomandări ai propune conducerii liceului în care înveți?", max_chars=250)

    if st.session_state.form_stage == 7:
        fields

    if st.session_state.form_stage < 7:
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