'use client'
import { useRouter } from "next/navigation";


export default function Login() {
  const router = useRouter()

  const handleSubmit = () => {
    router.push('/')
  }
  return (
    <section className="bg-bg-light dark:bg-bg-dark">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-card-light dark:bg-card-dark rounded-md shadow-lg md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight">
              Войти в аккаунт
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium">Email</label>
                <input type="email" name="email" id="email" className="bg-slate-200 border border-gray-300 sm:text-sm rounded-md  block w-full p-2.5" placeholder="gosha_chyra.com" />
              </div>
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium">Пароль</label>
                <input type="password" name="password" id="password" placeholder="••••••••" className="bg-slate-200 border border-gray-300 sm:text-sm rounded-md block w-full p-2.5 " />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded focus:ring-3 " />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="remember" className="">Запомнить меня</label>
                  </div>
                </div>
                <a href="#" className="text-sm font-medium hover:underline">Забыли пароль?</a>
              </div>
              <button type="submit" className="w-full font-medium bg-primary-light dark:bg-primary-dark text-primary-light-foreground dark:text-primary-dark-foreground focus:ring-2 focus:outline-none focus:outline-current rounded-md text-sm px-5 py-2.5 text-center focus:ring-bg-dark">Sign in</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
