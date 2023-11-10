<template>
    <div class="footer">
        <div class="icon">
            <div class="icon-item"><i class="fa-brands fa-facebook"></i></div>
            <div class="icon-item"><i class="fa-brands fa-instagram"></i></div>
            <div class="icon-item"> <i class="fa-brands fa-youtube"></i></div>
            <div class="icon-item"><i class="fa-brands fa-twitter"></i></div>
        </div>

        <div class="row">
            <ul>
                <li class="row-item">Contact us</li>
                <li class="row-item">Our Services</li>
                <li class="row-item">Privacy Policy</li>
                <li class="row-item">Terms & Conditions</li>
                <li class="row-item">Career</li>
            </ul>
        </div>

        <div class="copyright">
            <p> MUSIC 432HZ Copyright © 2023 Music 432Hz - All rights reserved || Designed By: Kim Khanh Dang</p>
        </div>
    </div>
</template>

<style scoped>
.footer {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    background: var(--black);
    margin-top: -70px;
    padding: 30px 0px;
    font-family: 'Play', sans-serif;
    text-align: center;
    height: 360px;
}

.footer .icon{
    display: flex;
    justify-content: center;
}

.footer .icon .icon-item{
    color: var(--gray);
    font-size: 30px;
    padding: 20px;
}

.icon .icon-item:hover{
    color: var(--white);
    cursor: pointer;
}

.footer .row .row-item {
    color: var(--gray);
    transition: 0.5s;
}

.footer .row .row-item:hover {
    color: var(--white);
    cursor: pointer;
}

.footer .row ul {
    width: 100%;
}

.footer .row ul li {
    display: inline-block;
    margin: 0px 30px;
}

.footer .copyright{
    color: var(--gray);
}
</style>