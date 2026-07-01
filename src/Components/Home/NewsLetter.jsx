import style from "./NewsLetter.module.css"
function NewsLetter() {
    return (

        <div className={style.NewsletterFooterNoGap}>

            <div className={style.Newsletter}>
                <div className={style.NewsletterBox}>
                    <h1 className={style.NewsletterTitle}>Subscribe on Our newsletter</h1>
                    <p className={style.NewsletterInfo}>Get daily news on upcoming offers from many suppliers all over the world
                    </p>
                    <form className={style.NewsletterForm} action="">
                        <div className={style.NewsletterIconInput}>
                            <i className="fa-solid fa-envelope"></i>
                            <input className={style.NewsletterInputEmail} type="email" placeholder="Email" />
                        </div>
                        <button className={style.NewsletterBtn} type="submit">Subscribe</button>
                    </form>
                </div>
            </div>

        </div>

    )
}

export default NewsLetter
