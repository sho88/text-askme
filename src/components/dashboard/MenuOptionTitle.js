export const MenuOptionTitle = ({ label = "default", id }) => {
  return <button id={id}>{label}</button>;
};

// export const MenuOptionTitle = (id) => {
//     const id = props.id;

//     return (
//       <div>
//         <a
//           id={id}
//           href="https://www.youtube.com/watch?v=KGDi6818H4w"
//           target={"_blank"}
//         >
//           <h2>New Message</h2>
//         </a>
//       </div>
//     );
//   };
