const NavBar = () => {
    return (
        <>
            <nav className="bg-white border-gray-200 dark:bg-gray-900 mb-10">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Staking SC</span>
                    <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                        <w3m-button />
                    </div>
                </div>
            </nav >
        </>
    )
}

export default NavBar