<template>
    <div class="home">
        <div id="carouselExampleCaptions" class="carousel slide" data-bs-ride="carousel" data-bs-interval="4000">
            <div class="carousel-indicators">
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active"
                    aria-current="true" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1"
                    aria-label="Slide 2"></button>
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2"
                    aria-label="Slide 3"></button>
            </div>
            <div class="carousel-inner">
                <div class="carousel-item active">
                    <img src="/image/danhdoi.png" class="d-block w-100" alt="...">
                    <div class="carousel-caption d-none d-md-block">
                        <h3>Đánh Đổi</h3>
                        <h5>Obito trở lại đường đua âm nhạc với album đầu tay</h5>
                    </div>
                </div>
                <div class="carousel-item">
                    <img src="/image/99percent.png" class="d-block w-100" alt="...">
                    <div class="carousel-caption d-none d-md-block">
                        <h3>99%</h3>
                        <h5>MCK ra mắt album 99% đầy bức phá</h5>
                    </div>
                </div>
                <div class="carousel-item">
                    <img src="/image/ai.png" class="d-block w-100" alt="...">
                    <!-- <div class="carousel-caption d-none d-md-block">
                        <h2 class="text-black">Ái</h2>
                        <h4 class="text-black">tlinh ra mắt album giải đáp câu hỏi tình yêu là gì?</h4>
                    </div> -->
                </div>
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions"
                data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions"
                data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
            </button>
        </div>
        <div class="main">
            <div class="about-container">
                <div class="img">
                    <img src="/image/about-us.jpg" alt="">
                </div>
                <div class="info-us">
                    <h2>About Us</h2>
                    <p>We are here to provide a quality music experience, we aim for two main goals, 
                        which are to support artists and their fandoms as well as create 
                        a friendly music listening environment healthy and brings interesting things to music lovers.</p>
                </div>
            </div>
            <div class="contact">
                <div class="contact-title">Send us something</div>
                <form @submit.prevent="sendMessage" class="contact-item">
                    <div class="special">
                        <div class="contact-item_child">
                            <input type="text" placeholder="Name" class="special-item" v-model="form.name" >
                        </div>
                        <div class="contact-item_child">
                            <input type="text" placeholder="Email" class="special-item" v-model="form.email">
                        </div>
                    </div>
                    <div class="contact-item_child">
                        <input type="text" placeholder="Phone" class="input" v-model="form.phone">
                    </div>
                    <div class="contact-item_child">
                        <textarea name="textarea" id="textarea" placeholder="Message" class="input" v-model="form.message"></textarea>
                    </div>
                    <button type="submit" class="btn">Send</button>
                </form>
            </div>
        </div>
        <div class="address">
            <div class="addr-container">
                <div class="info-contact">
                    <h1>Contact</h1>
                    <ul>
                        <li class="info-contact__item"><i class="fa-solid fa-location-dot"></i> 3/2 Xuân Khánh, Ninh Kiều, Cần Thơ, Việt Nam</li>
                        <li class="info-contact__item"><i class="fa-solid fa-envelope"></i> dangb2113306@student.ctu.edu.vn</li>
                        <li class="info-contact__item"><i class="fa-solid fa-phone"></i> 0899123456</li>
                        <li class="info-contact__item"><i class="fa-brands fa-facebook"></i> https://www.facebook.com/CTU.dtn.cntttt</li>
                    </ul>
                </div>
                <div class="map">
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3058.847550227907!2d105.76916295382193!3d10.031020792038023!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31a0883d2192b0f1%3A0x4c90a391d232ccce!2zVHLGsOG7nW5nIEPDtG5nIE5naOG7hyBUaMO0bmcgVGluIHbDoCBUcnV54buBbiBUaMO0bmcgKENUVSk!5e0!3m2!1svi!2s!4v1700709535623!5m2!1svi!2s" 
                width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import contactService from '../services/contact.service';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export default {
    name: 'Home',
    data() {
        return {
            form:{
                name: '',
                email: '',
                phone: '',
                message: ''
            }
        }
    },

    methods: {
        async sendMessage() {
            try {
                const response = await contactService.sendMessage(this.form)
                console.log(response)
                toast.success('Send message for admin successfully', {
                    autoClose: 1200,
                })
            } catch (error) {
                console.log(error)
            }            
        }
    }
}
</script>

<style scoped>
    .home{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;
        position: relative;
        top: -70px; 
    }

    .main{
        width: 100%;
        background-color: var(--black);
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        margin-bottom: 10px;
        margin: 10px;
    }
    .about-container{
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        background-color: var(--black-2);
        width: 90%;
        height: 400px;
        border-radius: 15px;
        margin: 10px;
    }

    .img{
        display: flex;
        align-items: center;
    }
    .img img{
        height: 350px;
        width: 400px;
        padding: 10px;
    }

    .info-us{
        width: 400px;
        height: auto;
        padding: 10px;
        font-size: 20px;
        color: var(--white);
    }
    .contact{
        /* margin: 20px; */
        display: flex;
        height: 500px;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        width: 90%;
        background-color: var(--black-2);
        border-radius: 20px;
        padding: 10px;
        margin: 10px;
    }

    .contact-title{
        color: var(--white);
        font-size: 50px;
        font-weight: 900;
        margin-bottom: 10px;
    }

    .contact-item{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 50%;
        margin-bottom: 10px;
    }

    .contact-item_child{
        margin-bottom: 5px;
        width: 100%;
    }

    .special{
        display: flex;
        justify-content: space-between;
        width: 100%;
    }
    
    .special-item{
        width: 90%;
        height: 50px;
        /* border: 2px solid var(--white); */
        border-radius: 50px;
        padding-left: 25px;
    }

    .input{
        padding-left: 25px;
        width: 100%;
        height: 50px;
        /* border: 2px solid var(--white); */
        border-radius: 50px;
    }

    .special-item::placeholder,
    .input::placeholder {
        color: var(--placeholder-color); /* Add your desired placeholder color */
        opacity: 0.7; /* Adjust the opacity as needed */
    }

    .btn{
        background-color: transparent;
        color: var(--white);
        font-weight: 600;
        font-size: 20px;
        width: 50%;
        padding: 10px;
        border: 2px solid var(--white);
        margin-bottom: 10px;
    }

    .btn:hover{
        background-color: var(--white);
        color: var(--black);
    }

    .address{
        width: 100%;
        height: 500px;
        background-color: var(--black);
    }

    .addr-container{
        display: flex;
        justify-content: space-around;
        align-items: center;
    }

    .info-contact{
        color: var(--white);
        width: 30%;
        height: 200px;
        font-size: 20px;
    }

    .map{
        padding-right: 50px;
        width: 40%;
        margin-top: 25px ;
    }
</style>