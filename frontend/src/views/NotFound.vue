<template>
    <div class="page">
        <div class="container">
            <div class="title">404</div>
            <h1 class="content">PAGE NOT FOUND :(</h1>
            <router-link to="/">
                <button class="btn">Go Back Home</button>
            </router-link>
        </div>
    </div>
</template>

<style scoped>
    .page{
        width: 100%;
        height: auto;
    }

    .container{
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        height: 100vh;
        width: 100%;
    }

    .title{
        font-size: 12rem;
        font-weight: 700;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }

    .btn{
        background: transparent;
        border: 2px solid var(--black);
        color: var(--black);
    }

    .btn:hover{
        background-color: var(--black);
        color: var(--white);
    }

</style>