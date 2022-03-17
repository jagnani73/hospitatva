// import { getAllTransactionsByBlock } from "./getAllTransactionsByBlock";
// import { getQualifiedData } from "./getQualifiedData";
// import {
//   triggerAcceptContractOwnership,
//   triggerAddMinterRemoveMinter,
//   triggerBatchBurn,
//   triggerBatchMint,
//   triggerBatchTransferFrom,
//   triggerBurn,
//   triggerCancelOrder,
//   triggerSetOrder,
//   triggerMint,
//   triggerPauseUnpause,
//   triggerSetBaseURI,
//   triggerSetContractOwnershipRecipient,
//   triggerSetRoyaltyFeeBPS,
//   triggerSetRoyaltyRecipient,
//   triggerSetSpender,
//   triggerTransferFrom,
//   triggerFulfillOrder,
//   triggerStart,
//   triggerBid,
//   triggerCancel,
//   triggerEnd,
// } from "./eventTriggers";

// export const indexAndStoreByBlockNum = async (blockNum: number) => {
//   // Get all transactions for a given block.
//   const { transactions, timestamp } = await getAllTransactionsByBlock(blockNum);

//   // Get the list of qualified events, transitions, and contracts in that list of transactions.
//   const {
//     qualifiedEvents,
//     // @TODO: check if we need these two anymore now that we only support ZRC-1 and ZRC-6 events.
//     // qualifiedTransitions,
//     qualifiedContracts,
//   } = await getQualifiedData(transactions);
//   for (const event of qualifiedEvents) {
//     try {
//       const contract = qualifiedContracts.find(
//         (e) => e.data.contractAddress === event.address
//       );
//       const contractType = contract?.type;
//       switch (contractType) {
//         case "ZRC6":
//           {
//             switch (event._eventname) {
//               case "Pause":
//               case "Unpause":
//                 await triggerPauseUnpause(event);
//                 break;
//               case "Mint":
//                 await triggerMint(event);
//                 break;
//               case "SetRoyaltyRecipient":
//                 await triggerSetRoyaltyRecipient(event);
//                 break;
//               case "SetRoyaltyFeeBPS":
//                 await triggerSetRoyaltyFeeBPS(event);
//                 break;
//               case "TransferFrom":
//                 await triggerTransferFrom(event);
//                 break;
//               case "Burn":
//                 await triggerBurn(event);
//                 break;
//               case "SetContractOwnershipRecipient":
//                 await triggerSetContractOwnershipRecipient(event);
//                 break;
//               case "AcceptContractOwnership":
//                 await triggerAcceptContractOwnership(event);
//                 break;
//               case "AddMinter":
//               case "RemoveMinter":
//                 await triggerAddMinterRemoveMinter(event);
//                 break;
//               case "SetSpender":
//                 await triggerSetSpender(event);
//                 break;
//               case "SetBaseURI":
//                 await triggerSetBaseURI(event);
//                 break;
//               case "BatchMint":
//                 await triggerBatchMint(event);
//                 break;
//               case "BatchBurn":
//                 await triggerBatchBurn(event);
//                 break;
//               case "BatchTransferFrom":
//                 await triggerBatchTransferFrom(event);
//                 break;
//               default:
//                 break;
//             }
//           }
//           break;
//         case "ZILLIQA_FIXED_PRICE":
//           {
//             switch (event._eventname) {
//               case "SetOrder":
//                 await triggerSetOrder(
//                   event,
//                   contract?.source_id!,
//                   contractType
//                 );
//                 break;
//               case "CancelOrder":
//                 await triggerCancelOrder(event, contract?.source_id!);
//                 break;
//               case "FulfillOrder":
//                 await triggerFulfillOrder(event, contract?.source_id!);
//                 break;
//               default:
//                 break;
//             }
//           }
//           break;
//         case "ZILLIQA_ENGLISH_AUCTION":
//           {
//             switch (event._eventname) {
//               case "Start":
//                 await triggerStart(
//                   event,
//                   contract?.source_id!,
//                   contract?.type!
//                 );
//                 break;
//               case "Bid":
//                 await triggerBid(event, contract?.source_id!, contract?.type!);
//                 break;
//               case "Cancel":
//                 await triggerCancel(
//                   event,
//                   contract?.source_id!,
//                   contract?.type!
//                 );
//                 break;
//               case "End":
//                 await triggerEnd(event, contract?.source_id!, contract?.type!);
//                 break;
//               default: {
//                 break;
//               }
//             }
//           }
//           break;
//         default: {
//           break;
//         }
//       }
//     } catch (err) {
//       console.log(`EVENT_ERROR: ${event._eventname} on ${event.address}`);
//       console.dir(err);
//     }
//   }

//   return true;
// };
