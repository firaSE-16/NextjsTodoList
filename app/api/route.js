import { ConnectDB } from "@/lib/config/db";
import TodoModel from "@/lib/models/TodoModel";
import { NextResponse } from "next/server";

// Ensure the database is connected
ConnectDB();

// GET: Retrieve todos from the database
export async function GET(request) {
  try {
    const todos = await TodoModel.find(); // Fetch all todos
    return NextResponse.json({ success: true, todos }); // Respond with data
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }); // Handle errors
  }
}

// POST: Add a todo to the database
export async function POST(request) {
  try {
    const { title, description } = await request.json();
    await TodoModel.create({ title, description }); // Create a new todo
    return NextResponse.json({
      success: true,
      message: "Todo added successfully",
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }); // Handle errors
  }
}

// DELETE: Remove a todo by ID
export async function DELETE(request) {
  try {
    const mongoId = request.nextUrl.searchParams.get("mongoId");
    if (!mongoId) throw new Error("Todo ID is required");

    await TodoModel.findByIdAndDelete(mongoId); // Delete the todo
    return NextResponse.json({
      success: true,
      message: "Todo deleted successfully",
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }); // Handle errors
  }
}
export async function PUT(request) {
  try {
    const mongoId = request.nextUrl.searchParams.get("mongoId");
    if (!mongoId) throw new Error("Todo ID is required");

    // Mark todo as completed
    await TodoModel.findByIdAndUpdate(mongoId, {
      $set: { isCompleted: true },
    });

    return NextResponse.json({
      success: true,
      message: "Todo marked as completed",
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error.message,
    });
  }
}