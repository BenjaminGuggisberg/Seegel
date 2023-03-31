import React, { useState } from 'react';

function ButtonMenu() {
    const [activeButton, setActiveButton] = useState(0);
    const [showContent, setShowContent] = useState(true);
    const [isMenuVisible, setisMenuVisible] = useState(true);


    const handleButtonClick = (index) => {
        setActiveButton(index);
        setShowContent(true);
        setisMenuVisible(false);
    };

    const handleMenuClick = () => {
        setShowContent(false);
        setisMenuVisible(true);
    };

    const buttons = [
        { label: 'Button 1', content: <div>Content for button 1</div> },
        { label: 'Button 2', content: <div>Content for button 2</div> },
        { label: 'Button 3', content: <div>Content for button 3</div> },
    ];

    return <>
        <div>
            {showContent ? (
                <>
                    <div>
                        {buttons.map((button, index) => (
                            <button key={index} onClick={() => handleButtonClick(index)}>
                                {button.label}
                            </button>
                        ))}

                    </div>
                    <div>
                        {buttons[activeButton].content}
                    </div>
                    <button onClick={handleMenuClick}>Back to Menu</button>
                </>
            ) : (
                
                <div>
                    <h1>Menu</h1>
                    <div>
                        {buttons.map((button, index) => (
                            <div key={index}>
                                {button.label}</div>
                        ))}
                    </div>
                    <button onClick={() => setShowContent(true)}></button>
                </div>)}
                
        </div>
    </>
}

export default ButtonMenu;