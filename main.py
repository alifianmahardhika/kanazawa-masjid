import streamlit as st
from model import User, Session

session = Session()
st.title("Selamat Datang di Website Masjid Umar bin Khatab, Kanazawa", anchor=False)

with st.form(key='email_input'):
    user_email = st.text_input('Masukkan email terdaftar untuk konfirmasi donasi')
    submit_button = st.form_submit_button(label='Kirim')
    if submit_button:
        user = session.query(User).filter_by(email=user_email).first()
        if not user:
            st.error("User not found!")
        # Initialization
        if 'user_email' not in st.session_state:
            st.session_state['user_email'] = user_email

if 'user_email' in st.session_state.keys():
    st.write(st.session_state)
    col1, col2 = st.columns(2)

    my_donation = col1.button("Donasi saya")
    confirm_donation = col2.button("Konfirmasi donasi")

    if confirm_donation:
        st.switch_page("pages/confirm_donation.py")
    if my_donation:
        st.switch_page("pages/my_donation.py")