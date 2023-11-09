<template>
    <div class="home">
        <div id="carouselExampleCaptions" class="carousel slide" data-bs-ride="carousel" data-bs-interval="3000">
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
    </div>
</template>

<script>

export default {
    name: 'Home',

}
</script>