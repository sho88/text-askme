import "@/components/live/style.css";
import { useRouter } from "next/router";

export default function Index() {

  // states and other properties go here...
  const router = useRouter();


  // events go here...
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`You have submitted something...`);
    return router.push('/dashboard');
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>

        <div>
          <label htmlFor="email">
            E-Mail <br />
            <input type="email" />
          </label>
        </div>

        <div>
          <label htmlFor="password">
            Password <br />
            <input type="password" />
          </label>
        </div>

        <div>
          <button>Login</button>
        </div>

      </form>
    </div>
  );
}
