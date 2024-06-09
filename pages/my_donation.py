import streamlit as st
import pandas as pd
from model import User, Donation, Session

def show_donation_history(user_email: str):
    # Query user and their donation history
    session = Session()
    user = session.query(User).filter_by(email=user_email).first()
    if user:
        st.header(f"Donation History for {user.name} ({user.email})")
        donations = session.query(Donation).filter_by(user_id=user.user_id).all()
        if donations:
            # Convert donation data to Pandas DataFrame
            donation_data = [
                {"Amount": donation.amount, "Date": donation.donation_date} 
                for donation in donations
            ]
            df = pd.DataFrame(donation_data)

            # Display DataFrame and allow filtering
            st.write(df)
        else:
            st.write("No donation history found for this user.")
    else:
        st.error("User not found.")

    # Close the session
    session.close()

# Streamlit app
st.title('Donasi Saya')

# Input user email
if 'user_email' in st.session_state.keys():
    user_email = st.session_state['user_email']
    show_donation_history(user_email=user_email)
else:
    user_email = st.text_input('Masukkan email')
    submit_button = st.button('Submit')
    if submit_button:
        show_donation_history(user_email=user_email)

home_btn = st.button("Kembali ke halaman awal")
if home_btn:
    st.switch_page("main.py")