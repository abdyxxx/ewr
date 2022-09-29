
export default function Authorization({onChange, onSubmit, errors}){
    return(
        <form className='modale__form modale__form-reg' onSubmit={onSubmit}>
            <h1>Авторизация</h1>

            <p>Логин</p>
            <input type="text" name="login" className='modale__input' onChange={onChange} />
            <span className='err'>{errors.login}</span>

            <p>Введите пароль</p>
            <input type="password" name="password" className='modale__input' onChange={onChange} />
            <span className='err'>{errors.password}</span>

            <input type="submit" value="Войти" className='modale__submit' />
            
            <input type="button" value="Зарегестрироваться" className='modale__submit' onClick={() => window.location.href = "/reg"}/>
        </form>
    )
}