import { Badge } from "~/components/ui/badge";

interface Props {
  // Define the props for your component here
}

const MyComponent: React.FC<Props> = (props) => {
  // Implement your component logic here

  const resArray = ["g ", "h ", "i ", "j ", "k ", "l ", "m ", "n ", "o ", "p "];

  return (
    <>
      <div className="flex flex-col gap-2 justify-center items-center w-full mt-5">
        <div className=" text-6xl font-black bg-gradient-to-b from-purple-500 to-white text-transparent bg-clip-text">
          Response
        </div>
        <div className="flex justify-center  ">
          <div className="bg-opacity-20 backdrop-filter w-[32rem] flex mx-auto justify-center backdrop-blur-md bg-white rounded-lg border-1 border-white/50">
            <div className="flex justify-center items-center h-[40vh] overflow-y-auto">
              <div className="flex flex-col gap-5 md:max-w-min mx-5">
                <div className="w-full flex gap-5"></div>
                <ul className="text-left">
                  {" "}
                  {/* Added text-left class */}
                  {resArray.map((item, index) => (
                    <li key={index} className="pb-1">
                      {" "}
                      {/* Wrapped each badge with li element */}
                      <Badge>{item.toUpperCase()}</Badge>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyComponent;
