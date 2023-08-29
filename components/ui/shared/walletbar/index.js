export default function WalletBar(userAddress, network, avatar) {
  return (
    <>
      {/* WalletBar */}

      <div className="flex justify-center items-center h-auto m-auto my-[45px] truncate md:my-5 w-[80%] md:w-[40vw] bg-white p-7  border border-black shadow-lg shadow-slate-500 rounded-[20px] rounded-bl-none">
        <div className="flex flex-col px-5 gap-3 justify-center items-center">
          <p className="font-normal text-sm font">Hello</p>
          <div className="flex items-center">
            {avatar != undefined ? (
              <div>
                <img
                  src="https://i.imgur.com/UhV7H97.jpeg"
                  alt="your avater"
                  width="40px"
                  height="40px"
                  className="rounded-full"
                ></img>
              </div>
            ) : (
              <></>
            )}
            <p className="font-normal font ml-2 ">
              {userAddress.userAddress}
            </p>
          </div>
        </div>
      </div>

      {/* WalletBar */}
    </>
  );
}
