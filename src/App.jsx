import "./index.css";
import { useState } from "react";

function App() {
  const [items, setItems] = useState([
    {
      key: "",
      value: "",
    },
  ]);

  const pasteHandler = (e, index) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text");
    if (pastedData) {
      const arr = pastedData
        .split("\n")
        .map((text, i) => {
          if (/([a-zA-Z_]+)=(.+?)/.test(text)) {
            let [key, value] = text.split("=");
            return { key, value };
          }
        })
        .filter(Boolean);

      console.log(arr);
      if (arr.length > 0) {
        setItems((items) => [
          ...items.slice(0, index),
          ...arr,
          ...items.slice(index + 1),
        ]);
      }
    }
  };

  const deleteHandler = (e, index) => {
    e.preventDefault();

    if (items.length > 1) {
      setItems((items) => items.filter((item, i) => i !== index));
    }else{
      setItems((items) => [{key:"",value:""}]);
    }
  };

  return (
    <div className="bg-[#111111] w-full min-h-screen flex flex-col items-center">
      <div className="text-white/70 mt-5 font-semibold ">
        Copy an Env File Text
      </div>
      <div className="container">
        <div className="flex flex-col items-center justify-between gap-y-4 gap-x-5 pt-5 px-5">
          {items.map((item, index) => {
            return (
              <div className="flex w-full gap-x-5 ">
                <div className="flex-1">
                  <input
                    onPaste={(e) => pasteHandler(e, index)}
                    placeholder="Örn: APP_URL"
                    className="w-full placeholder:text-white/40 outline-none flex-1 h-10 bg-[#000000] border text-white/50 p-4 border-white/30 rounded"
                    type="text"
                    onChange={(e) => {
                      setItems((items) =>
                        items.map((item, i) => {
                          if (i === index) {
                            item.key = e.target.value;
                          }
                          return item;
                        })
                      );
                    }}
                    value={item?.key}
                  />
                </div>
                <div className="flex-1">
                  <input
                    className="w-full placeholder:text-white/40 outline-none flex-1 h-10 bg-[#000000] border text-white/50 p-4 border-white/30 rounded"
                    type="text"
                    value={item?.value}
                    onChange={(e) => {
                      setItems((items) =>
                        items.map((item, i) => {
                          if (i === index) {
                            item.value = e.target.value;
                          }
                          return item;
                        })
                      );
                    }}
                  />
                </div>
                <button
                  onClick={(e) => deleteHandler(e, index)}
                  className="border-red-500 border outline-none transition-all duration-100  hover:bg-red-500/70 active:animate-pulse-100 hover:text-white/80 px-5 rounded text-red-500/80"
                >
                  Sil
                </button>
              </div>
            );
          })}
          <button
            className="mb-2 self-start h-10 text-blue-500/80 border font-semibold border-blue-500/50 px-5 rounded transition-all duration-100 hover:bg-blue-600/80 hover:text-white/80"
            onClick={(e) => {
              setItems((items) => [...items, { key: "", value: "" }]);
            }}
          >
            Yeni Ekle
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
