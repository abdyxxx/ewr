
export default function Registration({onChange, onSubmit, errors}){
    return(
        <form className='modale__form modale__form-reg' onSubmit={onSubmit}>
            <h1>Регистрация</h1>

            <p>Логин</p>
            <input type="text" name="login" className='modale__input' onChange={onChange} />
            <span className='err'>{errors.login}</span>

            <p>Ваш e-mail</p>
            <input type="text" name="email" className='modale__input' onChange={onChange} />
            <span className='err'>{errors.email}</span>

            <p>Введите пароль</p>
            <input type="password" name="password" className='modale__input' onChange={onChange} />
            <span className='err'>{errors.password}</span>

            <p>Повторите пароль</p>
            <input type="password" name="passwordControl" className='modale__input' onChange={onChange} />
            <span className='err'>{errors.passwordControl}</span>

            <input type="submit" value="Зарегестрироваться" className='modale__submit' />
            <input type="button" value="Авторизироваться" className='modale__submit' onClick={() => window.location.href = "/auth"}/>
        </form>
    )
}