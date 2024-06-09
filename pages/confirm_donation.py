import streamlit as st
import datetime
from model import User, Donation, Session

# Streamlit app
st.title('Konfirmasi Donasi')
session = Session()
def confirm_donation(user_email, amount):
    user = session.query(User).filter_by(email=user_email).first()
    if not user:
        st.error("User not found!")
        return

    donation = Donation(
        user_id=user.user_id,
        amount=amount,
        donation_date=datetime.date.today()
    )
    session.add(donation)
    session.commit()
    st.success(f"Donation of ${amount} by {user_email} confirmed.")

# Form to confirm a new donation
with st.form(key='donation_form'):
    # replace email input if email available in session
    if 'user_email' in st.session_state.keys():
        user_email = st.session_state['user_email']
        st.write("Email: ", user_email)
    else:
        user_email = st.text_input('Masukkan email')
    amount = st.number_input('Besar donasi (yen)', step=100, min_value=0)
    submit_button = st.form_submit_button(label='Kirim Konfirmasi')

    if submit_button:
        confirm_donation(user_email, amount)

home_btn = st.button("Kembali ke halaman awal")
if home_btn:
    st.switch_page("main.py")
# Close the session
session.close()
