'use client'
import { useRouter } from "next/navigation";


export default function Login() {
  const router = useRouter()

  const handleSubmit = () => {
    router.push('/')
  }
  return (
    <section className="bg-zinc-900 text-bg-1">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-zinc-800 rounded-md shadow-lg  md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-bg-1 md:text-2xl ">
              Войти в аккаунт
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-bg-1 ">Email</label>
                <input type="email" name="email" id="email" className="bg-slate-200 border border-gray-300 text-text-1 sm:text-sm rounded-md focus:ring-primary focus:border-primary block w-full p-2.5" placeholder="gosha_chyra.com" />
              </div>
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-bg-1">Пароль</label>
                <input type="password" name="password" id="password" placeholder="••••••••" className="bg-slate-200 border border-gray-300 text-text-1 sm:text-sm rounded-md focus:ring-primary focus:border-primary block w-full p-2.5 " />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-bg-1 focus:ring-3 focus:ring-primary " />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="remember" className="text-gray-300">Запомнить меня</label>
                  </div>
                </div>
                <a href="#" className="text-sm font-medium text-bg-2 hover:underline">Забыли пароль?</a>
              </div>
              <button type="submit" className="w-full text-text-1 font-medium bg-primary hover:bg-primary focus:ring-2 focus:outline-none focus:ring-bg-1 rounded-md text-sm px-5 py-2.5 text-center ">Sign in</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
