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
            
            <div class="contact">
                <div class="contact-title">Contact</div>
                <div class="contact-item">
                    <div class="special">
                        <div class="contact-item_child">
                            <input type="text" placeholder="Name" class="special-item">
                        </div>
                        <div class="contact-item_child">
                            <input type="text" placeholder="Email" class="special-item">
                        </div>
                    </div>
                    <div class="contact-item_child">
                        <input type="text" placeholder="Phone" class="input">
                    </div>
                    <div class="contact-item_child">
                        <textarea name="textarea" id="textarea" placeholder="Message" class="input"></textarea>
                    </div>
                    <button class="btn">Submit</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'Home',

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
    .contact{
        margin: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        width: 90%;
        background-color: var(--black-2);
        border-radius: 20px;
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
</style>